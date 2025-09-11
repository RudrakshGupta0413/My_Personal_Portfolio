import fs from 'fs';
import path from 'path';

// Define the type for an entry in your knowledge base
interface KnowledgeEntry {
  id: string;
  title: string;
  description?: string;
  summary?: string;
  technologies?: string[];
  skills?: {
    languages?: string[];
    technologies?: string[];
    system_design_architecture?: string[];
    tools_platform?: string[];
  };
  tech_stack?: string[];
  link?: string;
  // Add other properties from your JSON as needed
}

// Keep the file reading logic as requested.
// This is done at the top level, so it runs once when the module is imported.
const knowledgeBasePath = path.join(process.cwd(), 'data', 'knowledge.json');
const knowledgeBaseFile = fs.readFileSync(knowledgeBasePath, 'utf-8');
const knowledgeBase: KnowledgeEntry[] = JSON.parse(knowledgeBaseFile);

/**
 * A helper function to check if a text string contains any keywords from a query.
 * This is a more robust check than a simple string inclusion.
 */
function containsKeywords(text: string, query: string): boolean {
  const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lowerCaseText = text.toLowerCase();
  
  return keywords.some(keyword => lowerCaseText.includes(keyword));
}

/**
 * Formats a single knowledge entry into a human-readable string for the LLM.
 */
function formatEntry(entry: KnowledgeEntry): string {
    let formattedString = `--- ${entry.title} ---\n`;
    
    if (entry.summary) {
        formattedString += `Summary: ${entry.summary}\n`;
    }
    if (entry.description) {
        formattedString += `Description: ${entry.description}\n`;
    }
    if (entry.technologies) {
        formattedString += `Technologies: ${entry.technologies.join(', ')}\n`;
    }
    if (entry.tech_stack) {
        formattedString += `Tech Stack: ${entry.tech_stack.join(', ')}\n`;
    }
    if (entry.skills) {
        formattedString += `Skills:\n`;
        for (const [key, value] of Object.entries(entry.skills)) {
            formattedString += `  - ${key}: ${value.join(', ')}\n`;
        }
    }
    formattedString += "\n";
    return formattedString;
}

export function retrieveRelevantContext(query: string): string {
  const lowerCaseQuery = query.toLowerCase();
  let relevantEntries: KnowledgeEntry[] = [];
  
  // 1. Check for specific, high-level intents
  if (containsKeywords("projects portfolio", lowerCaseQuery)) {
    relevantEntries = knowledgeBase.filter(item => item.id.startsWith("project_"));
  } else if (containsKeywords("work experience jobs career", lowerCaseQuery)) {
    relevantEntries = knowledgeBase.filter(item => item.id.startsWith("work_"));
  } else if (containsKeywords("skills technologies languages", lowerCaseQuery)) {
    const skillsEntry = knowledgeBase.find(item => item.id === "rudraksh_gupta_overview");
    if (skillsEntry) {
      relevantEntries.push(skillsEntry);
    }
  } else {
    // 2. Fallback to a comprehensive keyword search across all entries
    const foundItems = new Set<string>(); // Use a Set to avoid duplicates
    relevantEntries = knowledgeBase.filter(item => {
      // Create a single searchable string from all relevant text fields
      const searchableText = [
        item.title,
        item.description,
        item.summary,
        item.technologies?.join(" "),
        item.tech_stack?.join(" "),
        item.skills?.languages?.join(" "),
        item.skills?.technologies?.join(" "),
        item.skills?.system_design_architecture?.join(" "),
        item.skills?.tools_platform?.join(" "),
      ].filter(Boolean).join(" ");

      // Check if the query is a substring of the searchable text
      if (searchableText.toLowerCase().includes(lowerCaseQuery) && !foundItems.has(item.id)) {
        foundItems.add(item.id);
        return true;
      }
      return false;
    });
  }

  if (relevantEntries.length === 0) {
    return '';
  }

  // 3. Format all relevant entries into a single, comprehensive context string
  let fullContext = "**Context about Rudraksh:**\n\n";
  relevantEntries.forEach(entry => {
    fullContext += formatEntry(entry);
  });
  
  return fullContext;
}
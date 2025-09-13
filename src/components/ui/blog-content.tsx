import React from 'react';
import { cn } from '@/lib/utils';

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content, className }) => {
  return (
    <div 
      className={cn(
        "blog-content prose prose-lg max-w-none",
        "prose-headings:font-bold prose-headings:text-foreground",
        "prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8",
        "prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-7",
        "prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6",
        "prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5",
        "prose-h5:text-lg prose-h5:mb-3 prose-h5:mt-4",
        "prose-h6:text-base prose-h6:mb-2 prose-h6:mt-3",
        "prose-p:text-foreground prose-p:leading-7 prose-p:mb-4",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-em:text-foreground",
        "prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-muted prose-pre:text-foreground prose-pre:border prose-pre:border-border",
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-6 prose-blockquote:py-2",
        "prose-ul:text-foreground prose-ol:text-foreground",
        "prose-li:text-foreground prose-li:mb-1",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-lg prose-img:shadow-md",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        colorScheme: 'inherit',
      }}
    />
  );
};

export { BlogContent };
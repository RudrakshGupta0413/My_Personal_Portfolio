import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor = forwardRef<ReactQuill, RichTextEditorProps>(
  ({ value, onChange, placeholder, className }, ref) => {
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video',
      'align', 'color', 'background',
      'script', 'code-block', 'direction'
    ];

    return (
      <div className={cn("rich-text-editor", className)}>
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            backgroundColor: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'calc(var(--radius) - 2px)',
          }}
        />
        <style>{`
          .rich-text-editor .ql-editor {
            min-height: 300px;
            font-family: inherit;
            color: hsl(var(--foreground));
            background-color: hsl(var(--background));
          }
          
          .rich-text-editor .ql-toolbar {
            border-top: 1px solid hsl(var(--border));
            border-left: 1px solid hsl(var(--border));
            border-right: 1px solid hsl(var(--border));
            background-color: hsl(var(--muted));
            border-top-left-radius: calc(var(--radius) - 2px);
            border-top-right-radius: calc(var(--radius) - 2px);
          }
          
          .rich-text-editor .ql-container {
            border-bottom: 1px solid hsl(var(--border));
            border-left: 1px solid hsl(var(--border));
            border-right: 1px solid hsl(var(--border));
            border-bottom-left-radius: calc(var(--radius) - 2px);
            border-bottom-right-radius: calc(var(--radius) - 2px);
          }
          
          .rich-text-editor .ql-toolbar .ql-stroke {
            stroke: hsl(var(--foreground));
          }
          
          .rich-text-editor .ql-toolbar .ql-fill {
            fill: hsl(var(--foreground));
          }
          
          .rich-text-editor .ql-toolbar button:hover {
            background-color: hsl(var(--accent));
          }
          
          .rich-text-editor .ql-toolbar button.ql-active {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
          }
          
          .rich-text-editor .ql-toolbar .ql-picker-label {
            color: hsl(var(--foreground));
          }
          
          .rich-text-editor .ql-toolbar .ql-picker-options {
            background-color: hsl(var(--background));
            border: 1px solid hsl(var(--border));
          }
          
          .rich-text-editor .ql-toolbar .ql-picker-item {
            color: hsl(var(--foreground));
          }
          
          .rich-text-editor .ql-toolbar .ql-picker-item:hover {
            background-color: hsl(var(--accent));
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export { RichTextEditor };
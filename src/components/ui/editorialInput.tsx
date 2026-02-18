'use client';

interface EditorialInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  isTextArea?: boolean;
}

const EditorialInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = "text", 
  isTextArea = false 
}: EditorialInputProps) => {
  return (
    <div className="flex flex-col gap-4 group w-full">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      
      {isTextArea ? (
        <textarea
          required 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-transparent border-b border-slate-100 py-4 outline-none focus:border-blue-600 transition-all text-2xl font-normal tracking-tight placeholder-slate-200 text-slate-800 resize-none"
        />
      ) : (
        <input 
          required 
          type={type} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-slate-100 py-4 outline-none focus:border-blue-600 transition-all text-2xl font-normal tracking-tight placeholder-slate-200 text-slate-800"
        />
      )}
    </div>
  );
};

export default EditorialInput;
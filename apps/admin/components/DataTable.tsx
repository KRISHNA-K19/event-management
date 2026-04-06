import { ReactNode } from 'react';

interface DataTableProps {
  children: ReactNode;
  headers: string[];
  className?: string;
}

export default function DataTable({ children, headers, className = '' }: DataTableProps) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-slate-800/50 ${className}`}>
      <table className={`min-w-full glass backdrop-blur-sm`}>
        <thead>
          <tr className={`bg-slate-900/50 border-b border-slate-700`}>
            {headers.map((header, idx) => (
              <th key={idx} className={`px-6 py-4 text-left text-sm font-bold text-neon uppercase tracking-wider`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y divide-slate-800`}>
          {children}
        </tbody>
      </table>
    </div>
  );
}

import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-50 text-left">Placeholder Header</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-50 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Placeholder</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Data</td>
          </tr>
        </tbody>
      </table>
      {children}
    </div>
  );
}

import React from 'react';

export const Table = ({ children }) => <table className="w-full border"> {children} </table>;
export const TableHeader = ({ children }) => <thead className="bg-gray-100"> {children} </thead>;
export const TableHead = ({ children }) => <th className="p-2 border"> {children} </th>;
export const TableBody = ({ children }) => <tbody> {children} </tbody>;
export const TableRow = ({ children }) => <tr className="hover:bg-gray-50"> {children} </tr>;
export const TableCell = ({ children }) => <td className="p-2 border"> {children} </td>;
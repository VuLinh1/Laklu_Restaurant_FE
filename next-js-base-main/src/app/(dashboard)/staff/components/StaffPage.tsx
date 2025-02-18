'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Eye } from "lucide-react";

const staffList = Array(22).fill(null).map((_, index) => ({
  id: `#10${index + 1}`,
  name: `Staff Member ${index + 1}`,
  role: "Employee",
  email: `staff${index + 1}@company.com`,
  phone: "+1 (123) 456-7890",
  age: `${25 + (index % 10)} yr`,
  salary: `$${2000 + index * 50}.00`,
  timings: "9am to 6pm"
}));

const itemsPerPage = 10;

export default function StaffPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(staffList.length / itemsPerPage);

  const currentPageData = staffList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Card className={'rounded-none'}>
      <div className="p-6 text-white bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Staff ({staffList.length})</h2>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">Add Staff</Button>
        </div>
        <Card className="bg-white text-black">
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-300">
                  <TableHead className="w-12"><input type="checkbox" /></TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Họ và Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Tuổi</TableHead>
                  <TableHead>Lương</TableHead>
                  <TableHead>Ca làm</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((staff, index) => (
                  <TableRow key={index} className="border-b border-gray-300">
                    <TableCell><input type="checkbox" /></TableCell>
                    <TableCell>{staff.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src="https://via.placeholder.com/30" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-black">{staff.name}</p>
                          <p className="text-gray-600 text-sm">{staff.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>{staff.age}</TableCell>
                    <TableCell>{staff.salary}</TableCell>
                    <TableCell>{staff.timings}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="ghost" className="text-pink-400 hover:text-pink-500">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" className="text-gray-600 hover:text-gray-400">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" className="text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Button onClick={prevPage} disabled={currentPage === 1} className="mr-2 px-4 py-2 border border-gray-400 text-black">Previous</Button>
              <span className="text-black">Page {currentPage} of {totalPages}</span>
              <Button onClick={nextPage} disabled={currentPage === totalPages} className="ml-2 px-4 py-2 border border-gray-400 text-black">Next</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}

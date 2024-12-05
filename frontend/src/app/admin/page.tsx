"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudUploadIcon, File, FileIcon, Link, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminPage() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Uploading files:", files);
    // Add your file upload logic here
  };

  const tableData = [
    {
      fileName: "INV001",
      tag: "Paid",
      lastModified: "2023-12-01",
      status: "Approved",
      tokens: "250",
    },
    {
      fileName: "INV002",
      tag: "Unpaid",
      lastModified: "2023-11-28",
      status: "Pending",
      tokens: "100",
    },
    {
      fileName: "INV003",
      tag: "Partial",
      lastModified: "2023-11-25",
      status: "Pending",
      tokens: "150",
    },
    {
      fileName: "INV004",
      tag: "Paid",
      lastModified: "2023-11-20",
      status: "Approved",
      tokens: "200",
    },
    {
      fileName: "INV004",
      tag: "Paid",
      lastModified: "2023-11-20",
      status: "Approved",
      tokens: "200",
    },
    {
      fileName: "INV004",
      tag: "Paid",
      lastModified: "2023-11-20",
      status: "Approved",
      tokens: "200",
    },
    {
      fileName: "INV004",
      tag: "Paid",
      lastModified: "2023-11-20",
      status: "Approved",
      tokens: "200",
    },
  ];

  return (
    <div className="w-full flex flex-col px-32 items-center gap-8 font-inter">
      <>
        <div
          className="flex items-center justify-center gap-4 p-3 border-2 border-dashed bg-inherit hover:bg-muted/20 transition-colors w-full mt-10 cursor-pointer"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.onchange = (event) => {
              const target = event.target as HTMLInputElement;
              if (target.files) {
                handleDrop(Array.from(target.files));
              }
            };
            input.click();
          }}
        >
          <p className="text-white font-inter font-bold text-xl">Drop files</p>
          <CloudUploadIcon className="w-12 h-12 text-white" />
        </div>
        {files.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted p-3 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <FileIcon className="w-6 h-6 text-muted-foreground" />
                    <p className="truncate">{file.name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={handleSubmit}>Upload Files</Button>
          </div>
        )}
      </>

      <div className="relative w-full font-inter px-96">
        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm font-medium text-white">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      <div className="flex w-full items-center space-x-0">
        <Input type="url" className="rounded-l-md rounded-r-none h-10 flex-1" />
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="rounded-r-md rounded-l-none h-10 px-6"
        >
          <p className="px-7">Add Link</p>
        </Button>
      </div>

      <Tabs defaultValue="document" className="w-full mt-4">
        <div className="flex items-center justify-center gap-2">
          <TabsList>
            <TabsTrigger value="document" className="px-8 py-1">
              <span className="mr-1">
                <File />
              </span>
              Account
            </TabsTrigger>
            <TabsTrigger value="link" className="px-8 py-1">
              <span className="mr-1">
                <Link />
              </span>
              Password
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex items-center justify-between gap-4 text-white my-2 mt-10">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium font-sans">Training Links</p>
            <p className="text-xs font-medium bg-slate-200 px-2 py-1 rounded-full text-indigo-600">
              81 Total
            </p>
          </div>
          <div className="">
            <Input
              type="search"
              placeholder="Search Link and Websites"
              className="w-20 sm:w-60 md:w-96 rounded-full bg-white"
            />
          </div>
        </div>
        <Separator className="mt-5" />

        <TabsContent value="document">
          <div className="relative w-full">
            <Table className="table-auto w-full">
              <ScrollArea className="h-40 overflow-auto w-full">
                <TableHeader className="sticky top-0 bg-sea-master-blue z-10">
                  <TableRow>
                    <TableHead className="text-white">File Name</TableHead>
                    <TableHead className="text-white">Tag</TableHead>
                    <TableHead className="text-white">Last Modified</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((item, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <TableCell className="font-medium">
                        {item.fileName}
                      </TableCell>
                      <TableCell>{item.tag}</TableCell>
                      <TableCell>{item.lastModified}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell className="text-right">
                        {item.tokens}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

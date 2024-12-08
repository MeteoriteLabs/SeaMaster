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
  const [activeTab, setActiveTab] = useState("document");
  const [searchQuery, setSearchQuery] = useState("");

  const originalTableData = [
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
  ];

  const filteredTableData = originalTableData.filter((item) =>
    item.fileName.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleSearch = (event: string) => {
    setSearchQuery(event);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-8 lg:px-16 items-center gap-8 font-inter">
      {/* File Drop Zone */}
      <div
        className="flex items-center justify-center gap-4 p-4 border-2 border-dashed bg-inherit hover:bg-muted/20 transition-colors w-full mt-6 cursor-pointer rounded-md"
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
        <p className="text-white font-bold text-base sm:text-lg md:text-xl">
          Drop files
        </p>
        <CloudUploadIcon className="w-10 h-10 text-white" />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4 mt-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted p-3 rounded-md"
              >
                <div className="flex items-center gap-3 truncate">
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
          <Button
            onClick={() => {}}
            className="w-full sm:w-auto px-6 py-2 rounded-md text-sm md:text-base"
          >
            Upload Files
          </Button>
        </div>
      )}

      {/* OR Divider */}
      <div className="relative w-full">
        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm font-medium text-white">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {/* Add Link Section */}
      <div className="flex flex-col sm:flex-row w-full gap-4 items-stretch h-24">
        <Input
          type="url"
          placeholder="Enter your link here"
          className="flex-1 rounded-md h-10 text-sm text-white placeholder:text-muted focus-visible:ring-0 placeholder:text-xs flex-shrink-0"
        />
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="rounded-md h-10 px-6 text-sm flex-shrink-0"
        >
          Add Link
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="document" className="w-full mt-6">
        {/* Tabs List */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto">
          <TabsList className="flex gap-2 px-2">
            <TabsTrigger
              value="document"
              className="px-6 py-1 text-sm md:text-base"
              onClick={() => setActiveTab("document")}
            >
              <File className="mr-1" />
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="px-6 py-1 text-sm md:text-base"
              onClick={() => setActiveTab("link")}
            >
              <Link className="mr-1" />
              Links
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tabs Content */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-white my-4">
          <div className="flex flex-row sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <p className="text-sm sm:text-base md:text-lg font-medium font-sans">
              Training {activeTab === "link" ? "Links" : "Documents"}
            </p>
            <p className="text-[10px] sm:text-xs font-medium bg-slate-200 px-2 py-1 rounded-full text-indigo-600">
              {filteredTableData?.length} Total
            </p>
          </div>
          <Input
            type="search"
            placeholder="Search Links and Websites"
            className="w-full sm:w-60 md:w-96 rounded-full bg-white text-black text-xs sm:text-sm"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>
        <Separator className="mt-5" />

        {/* <div className="relative w-full">
          <div className="overflow-x-auto">
            <Table className="table-auto w-full text-sm font-plusjakartasans">
              <ScrollArea className="h-40 overflow-auto">
                <TableHeader className="sticky top-0 bg-sea-master-blue z-1">
                  <TableRow>
                    <TableHead className="text-white">File Name</TableHead>
                    <TableHead className="text-white">Tag</TableHead>
                    <TableHead className="text-white">Last Modified</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTableData.map((item, index) => (
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
        </div> */}
      </Tabs>
    </div>
  );
}

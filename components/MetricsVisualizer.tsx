
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { metric: "accuracy/english", result: "pass" },
  { metric: "accuracy/english", result: "fail" },
  { metric: "accuracy/french", result: "pass" },
  { metric: "coverage/spanish", result: "pass" },
  { metric: "coverage/spanish", result: "fail" },
  { metric: "coverage/spanish", result: "fail" },
];

function computeMetrics(testCases) {
  const result = {};

  testCases.forEach(({ metric, result: status }) => {
    if (!metric.includes("/") || !["pass", "fail"].includes(status)) return;

    const [category, name] = metric.split("/");
    if (!result[category]) result[category] = {};
    if (!result[category][name]) result[category][name] = { pass: 0, fail: 0 };
    result[category][name][status]++;
  });

  return result;
}

const MetricsVisualizer = () => {
  const [data] = useState(() => computeMetrics(mockData));

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Test Metrics Dashboard</h1>
      <Tabs defaultValue={Object.keys(data)[0]}>
        <TabsList className="flex justify-center flex-wrap gap-2">
          {Object.keys(data).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(data).map(([category, metrics]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {Object.entries(metrics).map(([metric, counts]) => (
                <Card key={metric} className="rounded-2xl shadow-md">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-4">{metric}</h2>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[counts]}>
                        <XAxis dataKey={(d) => ""} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="pass" fill="#22c55e" name="Pass" />
                        <Bar dataKey="fail" fill="#ef4444" name="Fail" />
                      </BarChart>
                    </ResponsiveContainer>
                    <Table className="mt-4 text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Status</TableHead>
                          <TableHead>Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Pass</TableCell>
                          <TableCell>{counts.pass}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Fail</TableCell>
                          <TableCell>{counts.fail}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MetricsVisualizer;

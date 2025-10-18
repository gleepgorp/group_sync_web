import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import BaseInput from "@/components/base/BaseInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function ProfileContent() {
  const [name, setName] = useState("");
  const [tab, setTab] = useState("list");

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="flex items-start gap-8">
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <BaseInput label="Name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-4">
                  <div className="text-sm text-muted-foreground">Add your personal schedule here.</div>
                </TabsContent>
                <TabsContent value="calendar" className="mt-4">
                  <div className="text-sm text-muted-foreground">Calendar view coming soon.</div>
                </TabsContent>
              </Tabs>
              <Button className="rounded-lg mb-10" onClick={() => {}}>
                <PlusIcon className="size-4" /> Add schedule
              </Button>
            </div>
          </div>

          <aside className="w-80 hidden lg:block">
            <div className="sticky top-8">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Profile preview</div>
                <div className="mt-2 text-base font-medium">{name || "Your Name"}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}



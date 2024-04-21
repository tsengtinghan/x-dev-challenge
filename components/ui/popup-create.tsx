import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

const API_BASE_URL = "https://xlearn-rnuz.onrender.com";

function submitData(endpoint: string, data: {}) {
  console.log(`${API_BASE_URL}/${endpoint}`, JSON.stringify(data));
  return fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((e) => {
      console.error("Error submitting data:", e);
    });
}

export function PopoverDemo({ onAddMaterial, user_id } : { onAddMaterial: () => void , user_id: string }) {
  const [formData, setFormData] = useState({
    importUrl: "",
    customPrompt: "",
    quote: "",
    question: "",
    answer: "",
  });

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>,
    formType: string
  ) => {
    // event.preventDefault();
    let endpoint = "";
    let data = {};

    switch (formType) {
      case "import":
        endpoint = "import";
        data = { url: formData.importUrl, prompt: formData.customPrompt };
        break;
      case "quote":
        endpoint = "quotes";
        data = { quote: formData.quote };
        break;
      case "question":
        endpoint = "question";
        data = { user_id: user_id, question: formData.question, answer: formData.answer };
        console.log(data);
        break;
      default:
        return;
    }
    console.log("Submitting data:", data);
    const response = await submitData(endpoint, data);
    console.log("Server response:", response);
    onAddMaterial();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type='button'>New</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[auto]">
        <Tabs defaultValue="import" className="w-[600px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="import">
            <Card>
              <CardHeader>
                <CardTitle>Import</CardTitle>
                <CardDescription>
                  Make changes to your Import here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    name="importUrl"
                    value={formData.importUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="customPrompt">Custom Prompt</Label>
                  <Input
                    id="customPrompt"
                    name="customPrompt"
                    value={formData.customPrompt}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <PopoverClose>
                  <Button onClick={(e) => handleSubmit(e, "import")}>
                    Add
                  </Button>
                </PopoverClose>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="quotes">
            <Card>
              <CardHeader>
                <CardTitle>Quotes</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="quote">Quote</Label>
                  <Input
                    id="quote"
                    name="quote"
                    type="text"
                    value={formData.quote}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <PopoverClose>
                  <Button onClick={(e) => handleSubmit(e, "quote")}>Add</Button>
                </PopoverClose>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>
                  Make changes to your Import here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="answer">Answer</Label>
                  <Input
                    id="answer"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <PopoverClose asChild>
                  <Button onClick={(e) => handleSubmit(e, "question")}>
                    Add
                  </Button>
                </PopoverClose>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
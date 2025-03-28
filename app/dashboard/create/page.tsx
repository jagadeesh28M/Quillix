import { handleSubmission } from "@/actions/blog.action";
import { Submitbutton } from "@/components/general/Submitbutton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export default function CreateBlogPost() {
  return (
    <div className="rounded mt-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleSubmission}>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input name="title" required type="text" placeholder="title" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea name="content" required placeholder="content" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <Input name="url" required type="url" placeholder="Image url" />
            </div>

            <Submitbutton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

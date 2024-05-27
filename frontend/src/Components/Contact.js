import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="space-y-6">
      <main className="w-full py-6 md:py-12">
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-2">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-2xl gap-4 mx-auto">
              <form className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Select id="subject">
                    <option>Choose One</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales</option>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea className="min-h-[150px]" id="message" placeholder="Enter your message" />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-sm gap-2 text-sm md:grid-cols-2 md:max-w-none md:gap-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">123 Street Name, City, Country</p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">+1 (123) 456-7890</p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">info@example.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


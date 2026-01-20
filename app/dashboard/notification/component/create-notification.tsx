"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- Validation Schema ---------------- */
const NotificationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string()
    .oneOf(["instant", "schedule"])
    .required("Type is required"),
  recipient: Yup.string()
    .oneOf(["user", "rider", "all"], "Please select a recipient")
    .required("Recipient is required"),
  when: Yup.string().when("type", {
    is: "schedule",
    then: (schema) => schema.required("Schedule date is required"),
  }),
});

interface CreateNotificationForm {
  title: string;
  description: string;
  type: "instant" | "schedule";
  recipient: "user" | "rider" | "all";
  when?: string;
}

interface CreateNotificationModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateNotificationForm) => void;
}

/* ---------------- Component ---------------- */
export function CreateNotificationModal({
  open,
  onClose,
  onCreate,
}: CreateNotificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Notification</DialogTitle>
        </DialogHeader>

        <Formik<CreateNotificationForm>
          initialValues={{
            title: "",
            description: "",
            type: "instant",
            recipient: "user",
            when: "",
          }}
          validationSchema={NotificationSchema}
          onSubmit={(values, { resetForm }) => {
            onCreate(values);
            resetForm();
            onClose();
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">

              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <Field as={Input} name="title" placeholder="Enter title" />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <Field
                  as={Textarea}
                  name="description"
                  placeholder="Enter description"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
         {/* Recipient */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Recipient</label>
                <Select
                  value={values.recipient}
                  onValueChange={(val) => setFieldValue("recipient", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="recipient"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Type */}
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={values.type}
                  onValueChange={(val) => setFieldValue("type", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="type"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

     
              {/* Schedule Date */}
              {values.type === "schedule" && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Schedule Date</label>
                  <Field
                    as={Input}
                    type="datetime-local"
                    name="when"
                  />
                  <ErrorMessage
                    name="when"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              )}

              {/* Footer */}
              <DialogFooter className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </DialogFooter>

            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

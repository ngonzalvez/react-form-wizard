import { createRoot } from "react-dom/client";
import z from "zod";
import { State, City } from "country-state-city";
import FormWizard, { WizardStep } from "../src/FormWizard";
import Form from "../src/Form";

import "./styles.css";

const states = [
  { value: "NY", label: "New York" },
  { label: "California", value: "CA" },
  { label: "Illinois", value: "IL" },
  { label: "Texas", value: "TX" },
  { label: "Michigan", value: "MI" },
  { label: "Washington", value: "WA" },
  { label: "Massachusetts", value: "MA" },
  { label: "Florida", value: "FL" },
];

const cities = [
  { value: "NY", label: "New York" },
  { value: "SF", label: "San Francisco" },
  { value: "LA", label: "Los Angeles" },
  { value: "CH", label: "Chicago" },
];

const formSteps: WizardStep[] = [
  // Personal info step.
  {
    title: "Hi!",
    instructions: "Tell us about yourself.",
    key: "personalInfo",
    fields: [
      {
        key: "intro-image",
        type: "image",
        src: "https://www.cheggindia.com/wp-content/uploads/2021/02/How-To-Introduce-Yourself-in-English-Like-a-Pro.png",
        alt: "A person introducing themselves.",
      },
      {
        key: "name",
        label: "Full Name",
        type: "text",
        placeholder: "John Smith",
        required: true,
        schema: z.string().min(3),
      },
      {
        key: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "e.g. 123-456-7890",
      },
      {
        key: "email",
        label: "Email",
        type: "text",
        placeholder: "john@example.com",
      },
    ],
  },

  // Address step.
  {
    title: "Almost done,",
    instructions: "What's your home address?",
    key: "address",
    fields: [
      [
        {
          key: "state",
          label: "State",
          type: "select",
          options: State.getStatesOfCountry("US").map((state) => ({ value: state.isoCode, label: state.name })),
          placeholder: "Select a state",
        },
        {
          key: "city",
          label: "City",
          type: "select",
          options: (data) =>
            City.getCitiesOfState("US", data.state).map((city) => ({ value: city.name, label: city.name })),
          dependsOn: "state",
          placeholder: "Select a city",
        },
      ],
      [],

      { key: "addressLine1", label: "Address Line 1", type: "text", placeholder: "e.g. 123 Main St." },
      [
        { key: "addressLine2", label: "Address Line 2", type: "text", placeholder: "" },

        {
          key: "zipCode",
          label: "Zip Code",
          type: "text",
          placeholder: "e.g. 12345",
          className: "zipCode",
        },
      ],
    ],
  },

  // Purchase info step.
  {
    title: "That's it!",
    instructions: "We just need some information about your purchase.",
    key: "purchaseInfo",
    fields: [
      [
        { key: "orderNumber", label: "Order Number", type: "text", placeholder: "e.g. 123456789" },
        { key: "purchaseDate", label: "Purchase Date", type: "date", placeholder: "e.g. 01/01/2020" },
      ],
      { key: "branchLocation", label: "Branch Location", type: "text", placeholder: "e.g. 123 Main St." },
      {
        key: "reason",
        label: "RMA Reason",
        type: "checkbox",
        options: [
          { value: "defective", label: "Defecive" },
          { value: "wrongItem", label: "Wrong Item" },
          { value: "damaged", label: "Damaged" },
          { value: "quality", label: "Bad Quality" },
        ],
        placeholder: "Select a reason",
      },
    ],
  },
];

const logData = (data: Record<string, any>) => {
  console.log("Form data changed:", data);
};

const onSubmit = (data: Record<string, any>) => {
  console.log("Submitting:", data);
};

const component = <FormWizard steps={formSteps} submitLabel="Request RMA" onChange={logData} onSubmit={onSubmit} />;

//const { title, instructions, fields } = formSteps[0];
//const component = (
//  <Form title={title} instructions={instructions} fields={fields} onChange={logData} onSubmit={onSubmit} />
//);

const domNode = document.getElementById("root");
if (!domNode) throw new Error("Couldnt find root element");

const root = createRoot(domNode);
root.render(component);

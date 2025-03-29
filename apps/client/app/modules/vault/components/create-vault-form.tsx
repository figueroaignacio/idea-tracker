// Hooks
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "~/components/ui/button";
import { vaultSchema } from "../lib/schemas";

type VaultFormData = z.infer<typeof vaultSchema>;

export function CreateVaultForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VaultFormData>({
    resolver: zodResolver(vaultSchema),
    defaultValues: {
      name: "",
      fields: [{ name: "", type: "text" }],
    },
  });

  const [fields, setFields] = useState([{ name: "", type: "text" }]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<VaultFormData> = async (data) => {
    console.log("Vault Data Submitted:", data);

    try {
      const response = await fetch("http://localhost:3000/api/vaults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Vault creado:", result);
        navigate("/vault");
      } else {
        const errorData = await response.json();
        console.error("Error al crear el vault:", errorData.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "text" }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto bg-card p-6 rounded-md border border-border"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-lg font-semibold text-foreground">
          Vault's name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="name"
              className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-primary focus:ring-2 focus:ring-secondary transition duration-200"
              placeholder="Ingresa el nombre del vault"
            />
          )}
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Vault's fields
        </h3>
        {fields.map((_, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <div className="w-1/2">
              <Controller
                name={`fields.${index}.name`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-primary focus:ring-2 focus:ring-secondary transition duration-200"
                    placeholder={`Campo ${index + 1}`}
                  />
                )}
              />
              {errors.fields?.[index]?.name && (
                <p className="text-destructive text-sm">
                  {errors.fields[index].name?.message}
                </p>
              )}
            </div>

            <div className="w-1/4">
              <Controller
                name={`fields.${index}.type`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-primary focus:ring-2 focus:ring-secondary transition duration-200"
                  >
                    <option value="text">Text</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="boolean">Boolean</option>
                  </select>
                )}
              />
              {errors.fields?.[index]?.type && (
                <p className="text-destructive text-sm">
                  {errors.fields[index].type?.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveField(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={handleAddField}>
          Add field
        </Button>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Create Vault
      </Button>
    </form>
  );
}

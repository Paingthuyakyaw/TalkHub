import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? field.state.meta.errors.map((err) => (
            <div className=" text-[12px] mt-1 text-red-500 " key={err.message}>
              {err.message}
            </div>
          ))
        : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

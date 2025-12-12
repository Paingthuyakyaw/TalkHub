import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { FieldInfo } from "../../util/form-error-message";
import { useLogin } from "../../store/server/auth/mutationt";
import { useNavigate } from "@tanstack/react-router";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginComponent = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },
    onSubmit: ({ value }) => {
      login.mutate(value);
      navigate({ to: "/" });
    },
  });

  return (
    <div className=" grid grid-cols-2  ">
      <div className="h-screen bg-black"></div>
      <div className=" h-screen bg-gray-100 flex items-center justify-center ">
        <div className=" p-5 border border-gray-300 rounded-md w-[400px] ">
          <h3 className=" text-center font-[500px] text-slate-800 text-xl ">
            Welcome To <span className=" font-bold ">TALKHUB</span>
          </h3>
          <p className=" text-gray-600 text-sm text-center  ">
            Happy to connect with each other
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className=" mt-6 space-y-4 "
          >
            <div>
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <>
                      <label
                        className=" block text-sm text-zinc-800 font-[500px] "
                        htmlFor={field.name}
                      >
                        Email
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        type="email"
                        className=" font-[500px] text-sm text-gray-700 w-full focus:outline-none border-2 pl-2 py-1 border-gray-400 rounded-md "
                        placeholder="Enter your email"
                        autoComplete="email"
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>

            <div>
              <form.Field
                name="password"
                children={(field) => {
                  return (
                    <>
                      <label
                        className=" text-slate-800 text-sm font-[500px] "
                        htmlFor={field.name}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className=" text-gray-700 font-[500px] text-sm w-full focus:outline-none border-2 pl-2 py-1 border-gray-400 rounded-md "
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        name={field.name}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
              <div className=" text-end mt-1 text-slate-800 hover:cursor-pointer text-sm font-[500px] ">
                forgot password?
              </div>
            </div>

            <div className=" pt-2">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => {
                  return (
                    <>
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className=" text-sm active:scale-95 hover:bg-slate-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-white bg-slate-800 py-2 rounded-md cursor-pointer w-full"
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </>
                  );
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

import React from "react";
import LabeledInput from "../Elements/LabeledInput";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";

function FormSignUp() {
  return (
    <>
      {/* form start */}
      <div className="mt-16">
        <form action="">
          <div className="mb-6">
            <LabeledInput
              label="Full Name"
              id="name"
              type="text"
              placeholder="John Doe"
              name="name"
            />
          </div>
          <div className="mb-6">
            <LabeledInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="hello@example.com"
              name="email"
            />
          </div>
          <div className="mb-6">
            <LabeledInput
              label="Password"
              id="password"
              type="password"
              placeholder="*********"
              name="password"
            />
          </div>
          <Button>Register</Button>
        </form>
      </div>
      {/* form end */}
      {/* link start */}
      <div className="flex justify-center mt-6">
        <Link to="/login" className="text-primary text-sm font-bold">
          Already have an account? Sign in
        </Link>
      </div>
      {/* link end */}
    </>
  );
}

export default FormSignUp;

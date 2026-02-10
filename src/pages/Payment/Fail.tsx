import { Link, useSearchParams } from "react-router";

export default function Fail() {
  const [params] = useSearchParams();

  const transactionId = params.get("transactionId");
  const amount = params.get("amount");
  const status = params.get("status");
  const message = params.get("message");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment Failed ❌
        </h1>

        <div className="text-gray-700 space-y-2 mb-6">
          {message && (
            <p className="text-red-500 font-medium">{message}</p>
          )}

          {transactionId && (
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              {transactionId}
            </p>
          )}

          {amount && (
            <p>
              <span className="font-semibold">Amount:</span> ৳{amount}
            </p>
          )}

          {status && (
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-red-600 font-medium capitalize">
                {status}
              </span>
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/tours"
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}

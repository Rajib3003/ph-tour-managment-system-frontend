import { Link, useSearchParams } from "react-router";


const Success = () => {
  const [params] = useSearchParams();

  const transactionId = params.get("transactionId");
  const amount = params.get("amount");
  const status = params.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <div className="text-gray-700 space-y-2 mb-6">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ৳{amount}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600 font-medium capitalize">
              {status}
            </span>
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;

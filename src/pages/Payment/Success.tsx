import { useSearchParams } from "react-router";


export default function Success() {
  const [params] = useSearchParams();

  const transactionId = params.get("transactionId");
  const amount = params.get("amount");
  const status = params.get("status");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p>Transaction ID: {transactionId}</p>
      <p>Amount: {amount}</p>
      <p>Status: {status}</p>
    </div>
  );
}

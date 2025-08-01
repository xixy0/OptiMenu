import { useParams } from "react-router";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CustomerLoginForm from "@/components/customer/CustomerLoginForm";

function Home() {
  const { id } = useParams(); // Restaurant id from URL

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/pizza-background.jpg')" }} // Replace with your pizza background image path
    >
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-lg p-6 shadow-lg">
        <CardHeader className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">
            Welcome to <br /> "Restaurant Name"
          </h2>
        </CardHeader>

        <CardContent>
          <CustomerLoginForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <em>OR</em>
          {/* Continue as Guest Button */}
          <Link
            to={`/${id}/menu`}
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full border border-gray-300 text-gray-800 hover:border-red-500 hover:text-red-600 font-semibold py-2 rounded-lg"
            >
              Continue as Guest
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;

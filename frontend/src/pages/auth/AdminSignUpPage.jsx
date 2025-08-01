import AdminSignUpForm from "@/components/auth/AdminSignUpForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminSignUpPage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-2 px-10 ">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0" />
      </div>

      {/* Floating Circle Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl transform -rotate-2" />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl transform rotate-2" />
        <Card className="relative w-full shadow-xl backdrop-blur-sm bg-white/80">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create Admin Account
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Enter your details to register a new admin account
            </p>
          </CardHeader>
          <CardContent className="w-full">
            <AdminSignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSignUpPage;

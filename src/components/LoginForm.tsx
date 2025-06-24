
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Sparkles, Shield, Users } from 'lucide-react';
import { toast } from 'sonner';

type UserRole = 'vendor' | 'purchase' | 'finance' | 'approver';

interface LoginFormProps {
  onLogin: (role: UserRole, name: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('vendor');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error('Please fill in all fields');
      return;
    }
    
    toast.success(`Welcome, ${name}!`);
    onLogin(role, name);
  };

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="decoration-blob absolute top-20 left-20 w-72 h-72 bg-purple-400/30"></div>
        <div className="decoration-blob absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20" style={{animationDelay: '-2s'}}></div>
        <div className="decoration-blob absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400/25" style={{animationDelay: '-4s'}}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-2xl rotate-12 floating"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full floating" style={{animationDelay: '-1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-lg rotate-45 floating" style={{animationDelay: '-3s'}}></div>
      </div>

      {/* Main login card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="card-modern hover-lift shadow-luxury border-0 bg-white/90 backdrop-blur-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            {/* Enhanced logo section */}
            <div className="relative mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-glow transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110">
                <Building2 className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Glowing ring around logo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-600/20 blur-xl scale-110 -z-10"></div>
            </div>
            
            <div className="space-y-3">
              <CardTitle className="text-4xl font-bold text-gradient leading-tight">
                Vendor Portal
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg font-medium">
                Streamlined vendor onboarding and invoice management
              </CardDescription>
              
              {/* Feature highlights */}
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Multi-Role</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Modern</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-modern h-14 text-lg pl-4 pr-4"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 transition-opacity duration-200" style={{opacity: name ? 1 : 0}}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-modern h-14 text-lg pl-4 pr-4"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 transition-opacity duration-200" style={{opacity: email ? 1 : 0}}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-modern h-14 text-lg pl-4 pr-4"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 transition-opacity duration-200" style={{opacity: password ? 1 : 0}}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="role" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Role</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger className="h-14 text-lg input-modern border-2">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-2xl shadow-luxury">
                    <SelectItem value="vendor" className="text-lg py-3 focus:bg-gradient-to-r focus:from-blue-50 focus:to-indigo-50 rounded-lg m-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Vendor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="purchase" className="text-lg py-3 focus:bg-gradient-to-r focus:from-green-50 focus:to-emerald-50 rounded-lg m-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Purchase Department</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="finance" className="text-lg py-3 focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50 rounded-lg m-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Finance Department</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="approver" className="text-lg py-3 focus:bg-gradient-to-r focus:from-orange-50 focus:to-red-50 rounded-lg m-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>Approver</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-16 text-lg font-bold btn-gradient rounded-2xl shadow-luxury hover:shadow-glow transform transition-all duration-300 hover:scale-105 mt-8"
              >
                <span className="relative z-10">Sign In to Portal</span>
              </Button>
            </form>
            
            {/* Additional visual elements */}
            <div className="text-center pt-4">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                <span className="uppercase tracking-widest font-semibold">Secure Login</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm font-medium">
            Experience the future of vendor management
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

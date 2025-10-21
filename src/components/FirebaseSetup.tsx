import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const FirebaseSetup = () => {
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Firebase Configuration Required</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Google Sign-In Setup</AlertTitle>
          <AlertDescription>
            To enable Google authentication, you need to set up Firebase:
          </AlertDescription>
        </Alert>

        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Step 1: Create Firebase Project</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
              <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firebase Console</a></li>
              <li>Click "Add project" or select an existing project</li>
              <li>Follow the setup wizard</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Step 2: Enable Google Authentication</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
              <li>In Firebase Console, go to "Authentication"</li>
              <li>Click "Get started" if prompted</li>
              <li>Go to "Sign-in method" tab</li>
              <li>Enable "Google" provider</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Step 3: Get Your Config</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
              <li>Go to Project Settings (gear icon)</li>
              <li>Scroll down to "Your apps"</li>
              <li>Click "Web" icon to add a web app</li>
              <li>Copy the firebaseConfig object</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Step 4: Update Configuration</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
              <li>Open <code className="bg-secondary px-1 rounded">src/lib/firebase.ts</code></li>
              <li>Replace the demo config with your Firebase config</li>
              <li>Save the file</li>
            </ol>
          </div>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            Your Firebase config contains public API keys which is safe to include in client-side code.
            Firebase security is handled through Firebase Security Rules.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default FirebaseSetup;

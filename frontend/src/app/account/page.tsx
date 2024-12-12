import { Separator } from "@/components/ui/separator";
import { Laptop, Smartphone } from "lucide-react";

const AccountPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center font-inter text-foreground pb-10 font-bold text-sm">
      <div className="bg-muted w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] px-4 sm:px-6 lg:px-10 py-6 rounded-lg shadow-md">
        {/* Account Section */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl">Account</h2>
          <p className="text-xs sm:text-sm font-light">
            Manage your account information
          </p>
          <Separator className="my-2" />
          <div>
            <div>
              <h3 className="text-sm font-bold">Profile</h3>
              <p className="flex items-center my-3 text-sm px-3">
                <span className="bg-background w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 rounded-full inline-block mr-3 font-medium">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </span>
                Ship Master
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">Email Address</h3>
              <p className="text-xs sm:text-sm font-normal underline px-3 py-2">
                shipmaster@gmail.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Connected Accounts</h3>
              <p className="text-xs sm:text-sm font-normal underline px-3 py-2">
                shipmaster@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mt-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl">Security</h2>
          <p className="text-xs sm:text-sm font-light">
            Manage your security preferences
          </p>
          <Separator className="my-2" />
          <div className="">
            <h3 className="text-sm font-bold mb-3">Active Devices</h3>
            <div className="space-y-6">
              {/* Device 1 */}
              <div className="flex items-start space-x-6 sm:space-x-8 lg:space-x-12">
                <span className="w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center">
                  <Laptop size={50} />
                </span>
                <div className="font-light">
                  <p className="font-normal text-sm">Windows</p>
                  <p className="text-[9px] sm:text-xs">Chrome 128.0.0</p>
                  <p className="text-[9px] sm:text-xs">
                    display.windows.adminx5z3r5k9f162ac05t15jq6nts
                  </p>
                  <p className="text-[10px] sm:text-xs">Today at 4:12 PM</p>
                </div>
              </div>
              {/* Device 2 */}
              <div className="flex items-start space-x-6 sm:space-x-8 lg:space-x-12">
                <span className="w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center">
                  <Smartphone size={50} />
                </span>
                <div className="font-light">
                  <p className="font-normal text-sm">Android</p>
                  <p className="text-[9px] sm:text-xs">Chrome 128.0.0</p>
                  <p className="text-[9px] sm:text-xs">
                    display.androidx5z3r5k9f162ac05t15jq6nts
                  </p>
                  <p className="text-[10px] sm:text-xs">Today at 4:17 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

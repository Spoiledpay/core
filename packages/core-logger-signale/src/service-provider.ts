import { Services, Support, Types } from "@arkecosystem/core-kernel";
import { defaults } from "./defaults";
import { SignaleLogger } from "./driver";

export class ServiceProvider extends Support.AbstractServiceProvider {
    public async register(): Promise<void> {
        const logManager: Services.Log.LogManager = this.app.resolve<Services.Log.LogManager>("logManager");
        logManager.extend("signale", async () => new SignaleLogger(this.opts).make());
        logManager.setDefaultDriver("signale");

        // Note: Ensure that we rebind the logger that is bound to the container so IoC can do it's job.
        this.app.bind("log", await logManager.driver());
    }

    public getDefaults(): Types.ConfigObject {
        return defaults;
    }

    public getPackageJson(): Types.PackageJson {
        return require("../package.json");
    }
}
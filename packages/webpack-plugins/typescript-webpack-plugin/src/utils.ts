/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-empty-function */
import fs from "fs";
import typescript from "typescript";

export function resolveTsconfigPath(contextPath: string): string {
    const resolvedFile = typescript.findConfigFile(contextPath, fs.existsSync);
    if (resolvedFile != null) {
        return resolvedFile;
    }

    // TODO: Copy default tsconfig file.
    throw new Error("Failed to find tsconfig.json file.");
}

export function readTsConfig(filePath: string): typescript.ParsedCommandLine | undefined {
    const createConfigFileHost = {
        onUnRecoverableConfigFileDiagnostic: () => {},
        useCaseSensitiveFileNames: false,
        readDirectory: typescript.sys.readDirectory,
        fileExists: typescript.sys.fileExists,
        readFile: typescript.sys.readFile,
        getCurrentDirectory: typescript.sys.getCurrentDirectory
    };

    const tsconfig = typescript.getParsedCommandLineOfConfigFile(filePath, {}, createConfigFileHost);
    return tsconfig;
}

export function resolveTsConfig(contextPath: string) {
    const configPath = resolveTsconfigPath(contextPath);
    const configContent = readTsConfig(configPath);

    return {
        configPath,
        configContent
    };
}

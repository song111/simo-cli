interface IImportPluginOpts {
    libraryName: string;
    libraryDirectory?: string;
    style?: boolean;
    camel2DashComponentName?: boolean;
}
export interface IOpts {
    typescript?: boolean;
    react?: object;
    debug?: boolean;
    env?: object;
    transformRuntime?: object;
    reactRemovePropTypes?: boolean;
    reactRequire?: boolean;
    dynamicImportNode?: boolean;
    importToAwaitRequire?: object;
    autoCSSModules?: boolean;
    svgr?: object;
    import?: IImportPluginOpts[];
    lockCoreJS3?: object;
    modify?: Function;
}
declare const _default: (context: any, opts?: IOpts) => {
    presets: (false | any[] | undefined)[];
    plugins: any[][];
};
export default _default;

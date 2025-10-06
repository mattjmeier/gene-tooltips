declare module 'ideogram' {
  interface IdeogramOptions {
    container?: HTMLElement | string;
    organism?: string;
    chromosomes?: string[];
    annotationTracks?: Array<any>;
    chrHeight?: number;
    chrWidth?: number;
    [key: string]: any; // For untyped options
  }
  class IdeogramClass {
    constructor(options: IdeogramOptions);
    // more methods if needed
  }
  const Ideogram: typeof IdeogramClass;
  export default Ideogram;
}
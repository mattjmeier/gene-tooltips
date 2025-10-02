import 'tippy.js/dist/tippy.css';
import { type GeneTooltipConfig } from './config.js';
declare function init(userConfig?: Partial<GeneTooltipConfig>): void;
declare const _default: {
    init: typeof init;
};
export default _default;
declare global {
    interface Window {
        GeneTooltip: {
            init: (userConfig?: Partial<GeneTooltipConfig>) => void;
        };
    }
}
//# sourceMappingURL=index.d.ts.map
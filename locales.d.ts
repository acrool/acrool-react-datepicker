declare const useLocale: (locale?: string) => {
    i18n: (id: string, options?: {
        def?: string;
    }) => string;
};
export default useLocale;

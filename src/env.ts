import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars( {
    PUBLIC_VERSION: {
        public: true,
        static: true,
        description: "Application version displayed by the `version` command (set by the CI)",
        schema: ( value ) => value || "0.0.1"
    },
    PUBLIC_ANALYTICS_ENABLED: {
        public: true,
        static: true,
        description: "Whether the Umami analytics scripts are loaded",
        schema: ( value ) => value === "true"
    },
    PUBLIC_ANALYTICS_ENDPOINT: {
        public: true,
        static: true,
        description: "Base URL of the Umami analytics instance",
        schema: ( value ) => value
    },
    PUBLIC_ANALYTICS_PROJECT_ID: {
        public: true,
        static: true,
        description: "Umami website identifier",
        schema: ( value ) => value
    },
    PUBLIC_ANALYTICS_RESPECT_DNT: {
        public: true,
        static: true,
        description: "Whether Umami respects the visitor's Do Not Track preference",
        schema: ( value ) => value
    }
} );

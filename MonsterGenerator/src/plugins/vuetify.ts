import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const statBlockTheme: ThemeDefinition = {
    dark: false,
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'system',
        themes: {
            statBlock: {
                colors: {
                    surface: "fce5cd",
                    separatorColor: '#980101'
                },
                variables: {
                    'border-color': '#ffa500',
                    'border-opacity': 1,
                }
            },
            statBlockTenkan: {
                colors: {
                    surface: "#E50964",
                    'on-surface': "#ffffff",
                    separatorColor: '#F74891'
                },
                variables: {
                    'border-color': '#F74891',
                    'border-opacity': 1,
                }
            },
        },
    },
})

export default vuetify;
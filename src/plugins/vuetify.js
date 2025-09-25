import 'vuetify/styles'                    // <-- estilos base (obligatorio)
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  theme: { defaultTheme: 'light' },
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
})

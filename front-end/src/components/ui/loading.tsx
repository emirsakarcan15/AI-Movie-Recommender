import React from 'react'
import FadeContent from '../FadeContent'
import { Mail } from 'lucide-react'

function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

  {/* Ortadaki loading alanı */}
  <div className="flex-1 flex items-center justify-center">
    <div className="relative w-72 h-1 overflow-hidden rounded-full bg-neutral-800">
      <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-white animate-loadingBar" />
    </div>
  </div>

  {/* Footer */}
  <footer style={{ width: "1200px" }}  className="w-full border-t border-border py-10 px-6">
    <FadeContent blur duration={600}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="font-body text-xs uppercase tracking-[0.2em]">
            E-mail
          </span>
        </div>

        <p className="font-body text-sm">
          hello@whattowatch.com
        </p>
      </div>

      <p className="text-center font-body text-xs text-muted-foreground mt-10">
        © 2026 whattowatch. All rights reserved.
      </p>
    </FadeContent>
  </footer>

</div>
  )
}

export default Loading
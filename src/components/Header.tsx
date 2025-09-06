import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
  const handleResumeDownload = () => {
    // Create a temporary link element to download the resume
    const link = document.createElement('a')
    link.href = '/Abdul Aziz.pdf'
    link.download = 'Abdul_Aziz_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bricolage font-bold text-foreground">
          Abdul Aziz
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={handleResumeDownload}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105"
          >
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
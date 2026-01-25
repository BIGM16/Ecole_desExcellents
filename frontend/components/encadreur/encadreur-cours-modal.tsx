"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText } from "lucide-react"

interface EncadreurCoursModalProps {
  isOpen: boolean
  onClose: () => void
  cours?: any
}

export function EncadreurCoursModal({ isOpen, onClose, cours }: EncadreurCoursModalProps) {
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Fichiers ajoutés:", files)
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter des fichiers - {cours?.titre}</DialogTitle>
          <DialogDescription>Téléchargez des documents PDF pour ce cours</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <p className="text-muted-foreground text-xs">Code</p>
                <p className="font-medium">{cours?.code}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Niveau</p>
                <p className="font-medium">{cours?.niveau}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="files">Documents du cours (PDF, DOCX, etc.)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="files"
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("files")?.click()}
                className="w-full gap-2"
              >
                <Upload className="h-4 w-4" />
                Sélectionner des fichiers
              </Button>
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mt-3">
                <p className="text-sm text-muted-foreground">Fichiers sélectionnés ({files.length}):</p>
                <div className="space-y-1">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0 hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={files.length === 0}>
              Télécharger {files.length > 0 && `(${files.length})`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

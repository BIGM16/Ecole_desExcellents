"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HoraireModalProps {
  isOpen: boolean
  onClose: () => void
  horaire?: any
}

export function HoraireModal({ isOpen, onClose, horaire }: HoraireModalProps) {
  const [formData, setFormData] = useState({
    jour: "",
    heureDebut: "",
    heureFin: "",
    cours: "",
    encadreur: "",
    local: "",
  })

  useEffect(() => {
    if (horaire) {
      const [heureDebut, heureFin] = horaire.heure.split(" - ")
      setFormData({
        jour: horaire.jour,
        heureDebut,
        heureFin,
        cours: horaire.cours,
        encadreur: horaire.encadreur,
        local: horaire.local,
      })
    } else {
      setFormData({
        jour: "",
        heureDebut: "",
        heureFin: "",
        cours: "",
        encadreur: "",
        local: "",
      })
    }
  }, [horaire])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Horaire form submitted:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">{horaire ? "Modifier l'horaire" : "Ajouter un horaire"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jour">Jour</Label>
            <Select value={formData.jour} onValueChange={(value) => setFormData({ ...formData, jour: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un jour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lundi">Lundi</SelectItem>
                <SelectItem value="Mardi">Mardi</SelectItem>
                <SelectItem value="Mercredi">Mercredi</SelectItem>
                <SelectItem value="Jeudi">Jeudi</SelectItem>
                <SelectItem value="Vendredi">Vendredi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heureDebut">Heure de début</Label>
              <Input
                id="heureDebut"
                type="time"
                value={formData.heureDebut}
                onChange={(e) => setFormData({ ...formData, heureDebut: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heureFin">Heure de fin</Label>
              <Input
                id="heureFin"
                type="time"
                value={formData.heureFin}
                onChange={(e) => setFormData({ ...formData, heureFin: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cours">Cours</Label>
            <Select value={formData.cours} onValueChange={(value) => setFormData({ ...formData, cours: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Anatomie Générale">Anatomie Générale</SelectItem>
                <SelectItem value="Cardiologie Clinique">Cardiologie Clinique</SelectItem>
                <SelectItem value="Pédiatrie Pratique">Pédiatrie Pratique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="encadreur">Encadreur</Label>
            <Select
              value={formData.encadreur}
              onValueChange={(value) => setFormData({ ...formData, encadreur: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un encadreur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pr. Sarah Mbuyi">Pr. Sarah Mbuyi</SelectItem>
                <SelectItem value="Dr. David Kalala">Dr. David Kalala</SelectItem>
                <SelectItem value="Dr. Grace Nsimba">Dr. Grace Nsimba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="local">Local</Label>
            <Input
              id="local"
              placeholder="Ex: Salle A201"
              value={formData.local}
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              {horaire ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

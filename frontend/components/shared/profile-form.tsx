"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fetchWithRefresh from "@/lib/api";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useToast } from "@/lib/toast-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Camera, Save, Key, Eye, EyeOff } from "lucide-react";

interface ProfileFormProps {
  first_name?: string;
  last_name?: string;
  email?: string;
  // promotion?: string;
  telephone?: string;
  role: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export function ProfileForm({ role }: ProfileFormProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  }

  if (!user) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setPhotoFile(f);
    if (f) setPhotoPreview(URL.createObjectURL(f));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = new FormData();
      const formElements = e.currentTarget.elements;
      form.append(
        "first_name",
        (formElements.namedItem("first_name") as HTMLInputElement).value,
      );
      form.append(
        "last_name",
        (formElements.namedItem("last_name") as HTMLInputElement).value,
      );
      form.append(
        "email",
        (formElements.namedItem("email") as HTMLInputElement).value,
      );
      form.append(
        "promotion",
        (formElements.namedItem("promotion") as HTMLInputElement).value || "",
      );

      const res = await fetchWithRefresh(
        `${API_BASE}/api/auth/users/me/${id}`,
        {
          method: "PUT",
          body: form,
        },
      );
      if (res.ok) {
        addToast("success", "Profil mis à jour");
        const newProfile = await (
          await fetchWithRefresh(`${API_BASE}/api/auth/me/`)
        ).json();
        newProfile(newProfile);
        setPhotoPreview(newProfile.photo || null);
      } else {
        const err = await res.json().catch(() => ({}));
        addToast("error", err.detail || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      addToast("error", "Erreur réseau lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast("error", "Les mots de passe ne correspondent pas");
      return;
    }
    // TODO: appeler l'API pour changer le mot de passe
    addToast("success", "Mot de passe changé");
    setPasswordDialogOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getInitials = () => {
    const fn = user.first_name || "";
    const ln = user.last_name || "";
    return `${fn[0] || ""}${ln[0] || ""}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos informations personnelles
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Photo de Profil</CardTitle>
            <CardDescription>
              Cliquez sur l'avatar pour changer votre photo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-40 h-40 border-4 border-primary shadow-xl">
                {photoPreview ? (
                  <AvatarImage src={photoPreview} alt={user.first_name} />
                ) : (
                  <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="photo-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-8 h-8 text-white" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl text-foreground">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-primary font-medium mt-1">{user.promotion?.name || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
            <CardDescription>
              Mettez à jour vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    defaultValue={user.first_name || ""}
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    defaultValue={user.last_name || ""}
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email || ""}
                  placeholder="votre.email@ede.edu"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="promotion">Téléphone / Promotion</Label>
                <Input
                  id="promotion"
                  name="promotion"
                  defaultValue={user.promotion || ""}
                  placeholder="Promotion"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  defaultValue={user.telephone || ""}
                  placeholder="Telephone"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving
                    ? "Enregistrement..."
                    : "Enregistrer les modifications"}
                </Button>

                <Dialog
                  open={passwordDialogOpen}
                  onOpenChange={setPasswordDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Key className="w-4 h-4 mr-2" />
                      Changer le mot de passe
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Changer le mot de passe</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Mot de passe actuel
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "currentPassword",
                                e.target.value,
                              )
                            }
                            placeholder="Entrez votre mot de passe actuel"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">
                          Nouveau mot de passe
                        </Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "newPassword",
                                e.target.value,
                              )
                            }
                            placeholder="Entrez votre nouveau mot de passe"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirmer le nouveau mot de passe
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "confirmPassword",
                                e.target.value,
                              )
                            }
                            placeholder="Confirmez votre nouveau mot de passe"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setPasswordDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button onClick={handlePasswordSave}>Enregistrer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>

    // <div className="max-w-2xl mx-auto p-6">
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Mon Profil</CardTitle>
    //       <CardDescription>Gérez vos informations personnelles</CardDescription>
    //     </CardHeader>
    //     <CardContent className="space-y-6">
    //       <div className="grid grid-cols-2 gap-4">
    //         <div>
    //           <label className="text-sm font-medium">Prénom</label>
    //           <p className="text-foreground">
    //             {user.first_name || "Non défini"}
    //           </p>
    //         </div>
    //         <div>
    //           <label className="text-sm font-medium">Nom</label>
    //           <p className="text-foreground">
    //             {user.last_name || "Non défini"}
    //           </p>
    //         </div>
    //       </div>

    //       <div>
    //         <label className="text-sm font-medium">Email</label>
    //         <p className="text-foreground">{user.email}</p>
    //       </div>

    //       <div>
    //         <label className="text-sm font-medium">Rôle</label>
    //         <p className="text-foreground">{user.role}</p>
    //       </div>

    //       {user.telephone && (
    //         <div>
    //           <label className="text-sm font-medium">Téléphone</label>
    //           <p className="text-foreground">{user.telephone}</p>
    //         </div>
    //       )}

    //       <div className="pt-6 flex gap-4">
    //         <Button variant="outline">Modifier</Button>
    //         <Button>Sauvegarder</Button>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}

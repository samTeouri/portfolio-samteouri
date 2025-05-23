"use client"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import { useEffect } from "react"

interface CVData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  education: Array<{
    degree: string
    institution: string
    period: string
    details: string[]
  }>
  experience: Array<{
    position: string
    company: string
    period: string
    details: string[]
  }>
  skills: Array<{
    category: string
    items: Array<{ name: string; level: string }>
  }>
  languages: Array<{ name: string; level: string }>
  strengths: string[]
  interests: string[]
}

export async function generateCV(data: CVData): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()

  // Add a page to the document
  const page = pdfDoc.addPage([595.28, 841.89]) // A4 size

  // Get fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Set text properties
  const fontSize = 10
  const lineHeight = 15

  // Draw header
  page.drawText(data.name, {
    x: 50,
    y: 800,
    size: 24,
    font: fontBold,
    color: rgb(0, 0, 0),
  })

  page.drawText(data.title, {
    x: 50,
    y: 775,
    size: 14,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  })

  // Contact information
  let y = 750
  page.drawText(`Email: ${data.email}`, {
    x: 50,
    y,
    size: fontSize,
    font: fontRegular,
  })

  y -= lineHeight
  page.drawText(`Phone: ${data.phone}`, {
    x: 50,
    y,
    size: fontSize,
    font: fontRegular,
  })

  y -= lineHeight
  page.drawText(`Location: ${data.location}`, {
    x: 50,
    y,
    size: fontSize,
    font: fontRegular,
  })

  y -= lineHeight
  page.drawText(`LinkedIn: ${data.linkedin}`, {
    x: 50,
    y,
    size: fontSize,
    font: fontRegular,
  })

  y -= lineHeight
  page.drawText(`GitHub: ${data.github}`, {
    x: 50,
    y,
    size: fontSize,
    font: fontRegular,
  })

  // Education section
  y -= 30
  page.drawText("EDUCATION", {
    x: 50,
    y,
    size: 14,
    font: fontBold,
  })

  y -= 20
  data.education.forEach((edu) => {
    page.drawText(`${edu.degree}`, {
      x: 50,
      y,
      size: fontSize,
      font: fontBold,
    })

    y -= lineHeight
    page.drawText(`${edu.institution} | ${edu.period}`, {
      x: 50,
      y,
      size: fontSize,
      font: fontRegular,
    })

    y -= lineHeight
    edu.details.forEach((detail) => {
      page.drawText(`• ${detail}`, {
        x: 60,
        y,
        size: fontSize,
        font: fontRegular,
      })
      y -= lineHeight
    })

    y -= 10
  })

  // Experience section
  y -= 10
  page.drawText("PROFESSIONAL EXPERIENCE", {
    x: 50,
    y,
    size: 14,
    font: fontBold,
  })

  y -= 20
  data.experience.forEach((exp) => {
    page.drawText(`${exp.position}`, {
      x: 50,
      y,
      size: fontSize,
      font: fontBold,
    })

    y -= lineHeight
    page.drawText(`${exp.company} | ${exp.period}`, {
      x: 50,
      y,
      size: fontSize,
      font: fontRegular,
    })

    y -= lineHeight
    exp.details.forEach((detail) => {
      page.drawText(`• ${detail}`, {
        x: 60,
        y,
        size: fontSize,
        font: fontRegular,
      })
      y -= lineHeight
    })

    y -= 10
  })

  // Skills section
  y -= 10
  page.drawText("SKILLS", {
    x: 50,
    y,
    size: 14,
    font: fontBold,
  })

  y -= 20
  data.skills.forEach((skillCategory) => {
    page.drawText(`${skillCategory.category}:`, {
      x: 50,
      y,
      size: fontSize,
      font: fontBold,
    })

    y -= lineHeight
    skillCategory.items.forEach((skill) => {
      page.drawText(`• ${skill.name} - ${skill.level}`, {
        x: 60,
        y,
        size: fontSize,
        font: fontRegular,
      })
      y -= lineHeight
    })

    y -= 5
  })

  // Languages section
  y -= 10
  page.drawText("LANGUAGES", {
    x: 50,
    y,
    size: 14,
    font: fontBold,
  })

  y -= 20
  data.languages.forEach((lang) => {
    page.drawText(`• ${lang.name} - ${lang.level}`, {
      x: 60,
      y,
      size: fontSize,
      font: fontRegular,
    })
    y -= lineHeight
  })

  // Strengths section
  y -= 10
  page.drawText("STRENGTHS", {
    x: 50,
    y,
    size: 14,
    font: fontBold,
  })

  y -= 20
  data.strengths.forEach((strength) => {
    page.drawText(`• ${strength}`, {
      x: 60,
      y,
      size: fontSize,
      font: fontRegular,
    })
    y -= lineHeight
  })

  // Interests section
  y -= 10
  page.drawText("INTERESTS", {
    x: 50,
    y,
    size: 14,
    font: fontBold,
  })

  y -= 20
  data.interests.forEach((interest) => {
    page.drawText(`• ${interest}`, {
      x: 60,
      y,
      size: fontSize,
      font: fontRegular,
    })
    y -= lineHeight
  })

  // Serialize the PDFDocument to bytes
  return await pdfDoc.save()
}

export function CVGenerator() {
  useEffect(() => {
    const generateAndSaveCV = async () => {
      try {
        const cvData: CVData = {
          name: "Samrou TEOURI",
          title: "Futur développeur web",
          email: "teourisamrou@gmail.com",
          phone: "+33 6 13 19 61 83",
          location: "Valenciennes (59300)",
          linkedin: "linkedin.com/in/samrou-teouri",
          github: "github.com/samTeouri",
          education: [
            {
              degree: "Master Technologies Nouvelles des Systèmes d'Information et Décisionnels",
              institution: "INSA Hauts-de-France Valenciennes",
              period: "2024 à 2026",
              details: [
                "Ingénierie de projets informatiques",
                "Interaction homme-machine (IHM)",
                "Architectures embarquées",
                "Conception et programmation",
                "Fouille de données",
                "Fondements de l'intelligence artificielle",
              ],
            },
            {
              degree: "Licence : Informatique des Organisations",
              institution: "IFNTI Sokodé, Togo",
              period: "2020 à 2024",
              details: [
                "Développement logiciel",
                "Conception d'applications",
                "Sécurité informatique",
                "Infrastructures réseau",
                "Résolution de problèmes professionnels",
              ],
            },
            {
              degree: "BAC : Sciences Physique et Mathématiques",
              institution: "Lycée Moderne de Sokodé Sokodé, Togo",
              period: "2020",
              details: [],
            },
          ],
          experience: [
            {
              position: "Développeur web principal",
              company: "Eaprog Inc Sedan, France",
              period: "2023 à 2024",
              details: [
                "Plateforme de vente",
                "Trading Algorithmique",
                "Optimisation des performances",
                "Expert Advisors",
                "MQL5, MetaTrader5",
              ],
            },
            {
              position: "Analyste de développement d'application",
              company: "Knowide CI Abidjan, Côte d'Ivoire",
              period: "2022",
              details: [
                "Analyse de cahier des charges",
                "Modélisation des besoins",
                "Maintenance de site",
                "Mise à jour de contenu",
                "Gestion de projet web",
                "Communication client",
              ],
            },
            {
              position: "Enseignant vacataire",
              company: "IFNTI Sokodé, Togo",
              period: "2022 à 2024",
              details: [
                "Développement de l'écoute active",
                "Suivi pédagogique",
                "Communication orale",
                "Animation de séances pédagogiques interactives",
              ],
            },
          ],
          skills: [
            {
              category: "Informatique",
              items: [
                { name: "Laravel, Django, JEE, Express JS, BASH", level: "Opérationnel" },
                { name: "MongoDB, PostgreSQL, MySQL", level: "Opérationnel" },
                { name: "Linux, Windows", level: "Opérationnel" },
                { name: "Pratique du développement Agile/Scrum", level: "Intermédiaire" },
                { name: "Analyse des besoins utilisateurs", level: "Opérationnel" },
                { name: "Vision globale sur les projets web", level: "Intermédiaire" },
                { name: "Réalisation d'API RESTful", level: "Avancé" },
              ],
            },
          ],
          languages: [
            { name: "Anglais", level: "Niveau B2" },
            { name: "Français", level: "Niveau C2" },
          ],
          strengths: [
            "Curiosité intellectuelle",
            "Esprit critique",
            "Sens de l'organisation",
            "Autonomie",
            "Esprit d'analyse",
          ],
          interests: ["Passion pour le Football", "Voyages : Ghana, Suède, Angleterre, Bénin", "Cuisine"],
        }

        const pdfBytes = await generateCV(cvData)

        // Create a Blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: "application/pdf" })

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob)

        // Create a link element
        const link = document.createElement("a")
        link.href = url
        link.download = "samrou-teouri-cv.pdf"

        // Append to the document
        document.body.appendChild(link)

        // Trigger the download
        link.click()

        // Clean up
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Error generating CV:", error)
      }
    }

    // Uncomment this line to generate the CV when the component mounts
    // generateAndSaveCV()
  }, [])

  return null
}

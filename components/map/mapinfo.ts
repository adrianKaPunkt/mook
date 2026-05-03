export const mapInfo = {
  pin: {
    title: "Zenzakan",
    text: "Der Haupteingang befindet sich im Hinterhof",
  },
  sbahn: {
    title: "S-Bahn Taunusanlage",
    text: "Schnelle Verbindung zur Innenstadt und Hauptwache.",
  },
  ubahn: {
    title: "U-Bahn Alte Oper",
    text: "Zentrale Lage direkt an der Alten Oper.",
  },
  alteOper: {
    title: "Alte Oper",
    text: "Eines der wichtigsten Wahrzeichen in direkter Umgebung.",
  },
  deutscheBank: {
    title: "Deutsche Bank Türme",
    text: "Markanter Orientierungspunkt der Frankfurter Skyline.",
  },
  opernplatz: {
    title: "Opernplatz",
    text: "",
  },
  goethestr: {
    title: "Goethestraße",
    text: "",
  },
  fressgasse: {
    title: "Fressgasse",
    text: "",
  },
  kettenhofweg: {
    title: "Kettenhofweg",
    text: "",
  },
  guiollettstr: {
    title: "Guiollettstraße",
    text: "Eingang Ivory Club - Valet Parking und Nebeneingang zum Zenzakan.",
  },
  junghofstr: {
    title: "Junghofstraße",
    text: "",
  },
  niedenau: {
    title: "Niedenau",
    text: "",
  },
  oberlindau: {
    title: "Oberlindau",
    text: "",
  },
  kleineHochstr: {
    title: "Kleine Hochstraße",
    text: "",
  },
  klueberstr: {
    title: "Klüberstraße",
    text: "",
  },
  kaiserhofstr: {
    title: "Kaiserhofstraße",
    text: "",
  },
  leerbachstr: {
    title: "Leerbachstraße",
    text: "",
  },
  grosseBockenheimer: {
    title: "Große Bockenheimer Straße",
    text: "",
  },
  bockenheimerLandstr: {
    title: "Bockenheimer Landstraße",
    text: "",
  },
  neueMainzer: {
    title: "Neue Mainzer Straße",
    text: "",
  },
  bockenheimerAnlage: {
    title: "Bockenheimer Anlage",
    text: "",
  },
  taunusanlage: {
    title: "Taunusanlage",
    text: "",
  },
};

export type MapKey = keyof typeof mapInfo;

export function normalizeSvgId(id: string): MapKey | null {
  if (id.endsWith("pin")) return "pin";
  if (id.endsWith("sbahn")) return "sbahn";
  if (id.endsWith("alteOper")) return "alteOper";
  if (id.endsWith("deutscheBank")) return "deutscheBank";
  if (id.endsWith("opernplatz")) return "opernplatz";
  if (id.endsWith("goethestr")) return "goethestr";
  if (id.endsWith("fressgasse")) return "fressgasse";
  if (id.endsWith("kettenhofweg")) return "kettenhofweg";
  if (id.endsWith("guiollettstr")) return "guiollettstr";
  if (id.endsWith("junghofstr")) return "junghofstr";
  if (id.endsWith("niedenau")) return "niedenau";
  if (id.endsWith("oberlindau")) return "oberlindau";
  if (id.endsWith("kleineHochstr")) return "kleineHochstr";
  if (id.endsWith("klueberstr")) return "klueberstr";
  if (id.endsWith("leerbachstr")) return "leerbachstr";
  if (id.endsWith("kaiserhofstr")) return "kaiserhofstr";
  if (id.endsWith("grosseBockenheimer")) return "grosseBockenheimer";
  if (id.endsWith("bockenheimerLandstr")) return "bockenheimerLandstr";
  if (id.endsWith("neueMainzer")) return "neueMainzer";
  if (id.endsWith("bockenheimerAnlage")) return "bockenheimerAnlage";
  if (id.endsWith("taunusanlage")) return "taunusanlage";

  return null;
}

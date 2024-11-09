type TotalOPD = {
  opd: string;
  total: number;
};

type Catalog = {
  kode: number;
  name: string;
  sektor: string;
  urusan: string;
  subUrusan: string;
  opd: string;
};

function GetReferensiArsitekturID(pathname: string): number {
  const PATHNAME_ID: Record<string, number> = {
    "domain-probis": 1,
    "domain-layanan": 2,
    "domain-data": 3,
    "domain-aplikasi": 4,
    "aplikasi-usulan": 5,
    "peta-rencana": 6,
  };

  if (!(pathname in PATHNAME_ID)) {
    return 0;
  }

  return PATHNAME_ID[pathname];
}

function PublicDataTransform(
  data: Record<string, any>
): [TotalOPD[], Catalog[]] {
  let opdCountData: TotalOPD[] = [];
  let catalogData: Catalog[] = [];

  Object.entries(data).map((value) => {
    let opdCount: TotalOPD = { opd: "", total: 0 };
    value.map((OPD) => {
      if (typeof OPD == "string") {
        if (OPD !== "total_dokumen") {
          opdCount.opd = OPD;
        }
      }

      if (typeof OPD == "object") {
        opdCount.total = OPD.jumlah;
        let catalogs: Catalog[] = OPD.data.map((referensi: any) => {
          return {
            kode: referensi.kode,
            name: referensi.nama,
            sektor: referensi.sektor.nama,
            urusan: referensi.urusan.nama,
            subUrusan: referensi.sub.nama,
            opd: referensi.OPD,
          };
        });
        catalogData.push(...catalogs);
      }
    });
    opdCountData.push(opdCount);
  });

  return [opdCountData.filter((item) => item.opd !== ""), catalogData];
}

export {
  GetReferensiArsitekturID,
  PublicDataTransform,
  type TotalOPD,
  type Catalog,
};

import BaseTable from "../Table"

export default function ProsesBisnisSection4() {
  const cells = [
    "Nama Proses Bisnis",
    "Sektor Pemerintahan",
    "Urusan Pemerintahan",
    "Sub Urusan",
    "OPD"
  ]

  const tableData = [
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan"
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan"
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan"
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan"
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan"
    },
  ]
  return (
    <>
      <BaseTable
        row_head_cells={cells}
        row_body_data={tableData}
        use_pagination={true}
        use_row_number={true}
      />
    </>
  )
}
import BaseTable from "../Table";

export default function DomainDataSection4() {
  const row_body_data = [
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas_data: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      jenis_data_pokok: "cell5",
      jenis_data_tematik: "cell6",
      produsen_data: "cell7",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas_data: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      jenis_data_pokok: "cell5",
      jenis_data_tematik: "cell6",
      produsen_data: "cell7",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas_data: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      jenis_data_pokok: "cell5",
      jenis_data_tematik: "cell6",
      produsen_data: "cell7",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas_data: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      jenis_data_pokok: "cell5",
      jenis_data_tematik: "cell6",
      produsen_data: "cell7",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas_data: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      jenis_data_pokok: "cell5",
      jenis_data_tematik: "cell6",
      produsen_data: "cell7",
    },
  ]
  return (
    <>
      <BaseTable
        row_head_cells={["Nama Data", "Sifat Data", "Validitas Data", "Aplikasi Pendukung", "Penunjang Layanan", "Jenis Data Pokok", "Jenis Data Tematik", "Produsen Data"]}
        row_body_data={row_body_data}
        use_row_number={true}
        use_pagination={true}
        font_size="small"
      />
    </>
  )
}
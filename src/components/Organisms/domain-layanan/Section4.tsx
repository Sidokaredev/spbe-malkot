import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import ApacheECharts from "../../Molecules/ApacheECharts";
import { EChartsOption } from "echarts";
import { blue, green, grey, lightBlue, orange, purple } from "@mui/material/colors";
import CircleBullet from "../../Molecules/CircleBullet";
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg"
// import { useState } from "react";

export default function DomainLayananSection4() {
  /* State */
  // const [onHover, setOnHover] = useState<boolean>(false)

  const chartOptions: EChartsOption = {
    tooltip: {},
    series: {
      type: "sankey",
      id: "sankey-layanan",
      name: "Layanan on Sankey Chart",
      left: "0%",
      right: "20%",
      layoutIterations: 0,
      orient: "horizontal",
      draggable: false,
      label: {
        show: true,
        position: "right",
        distance: 5,
        formatter: '{b} : {c}',
        color: "black",
        fontFamily: "Poppins"
      },
      labelLayout: {}, // move label when overlapped
      itemStyle: {
        borderRadius: 0
      },
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
      emphasis: {
        disabled: false,
        focus: "series",
        blurScope: "global",
        label: {
          show: true,
        },
        itemStyle: {},
        lineStyle: {}
      },
      blur: {
        label: {},
        itemStyle: {},
      },
      select: {
        disabled: false,
        label: {},
        itemStyle: {},
        lineStyle: {},
      },
      selectedMode: false,
      data: [
        {
          name: "Masyarakat",
          itemStyle: {
            color: green[700],
          },
          label: {
            show: true,
          },
          emphasis: {
            label: {
              // fontWeight: "bold"
            }
          }
        },
        {
          name: "Bisnis",
          itemStyle: {
            color: orange[700]
          }
        },
        {
          name: "ASN/Pegawai",
          itemStyle: {
            color: blue[700]
          }
        },
        {
          name: "Pemerintah",
          itemStyle: {
            color: purple[700]
          }
        },
        {
          name: "Online",
          itemStyle: {
            color: green[400]
          }
        },
        {
          name: "Offline",
          itemStyle: {
            color: grey[400]
          }
        },
      ],
      links: [
        {
          source: "Masyarakat",
          target: "Offline",
          value: 30,
          emphasis: {}
        },
        {
          source: "Masyarakat",
          target: "Online",
          value: 24
        },
        {
          source: "Bisnis",
          target: "Offline",
          value: 47
        },
        {
          source: "Bisnis",
          target: "Online",
          value: 13
        },
        {
          source: "ASN/Pegawai",
          target: "Offline",
          value: 38
        },
        {
          source: "ASN/Pegawai",
          target: "Online",
          value: 60
        },
        {
          source: "Pemerintah",
          target: "Offline",
          value: 78
        },
        {
          source: "Pemerintah",
          target: "Online",
          value: 32
        },
      ],
      tooltip: {}
    }
  }
  return (
    <>
      {/* Collapse Element */}
      {/* <Collapse in={onHover}>
        <CircleBullet />
      </Collapse> */}
      <Box
        display={"flex"}
        alignItems={"center"}
      >
        <Box
          component={"img"}
          src={SankeyIcon}
          sx={{
            width: 24,
            height: 24
          }}
        />
        <Typography
          variant={"subtitle1"}
          sx={{
            marginLeft: "0.5em",
            fontWeight: "medium",
          }}
        >
          Target Layanan X Metode Layanan
        </Typography>
      </Box>
      <Grid container
        height={"20em"}
      >
        <Grid item
          xs={8}
        >
          <ApacheECharts
            chartOptions={chartOptions}
          />
        </Grid>
        <Grid item
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Grid container
            spacing={2}
            display={"flex"}
            alignItems={"center"}
          >
            <Grid item
              xs={12}
            >
              <Box
                component={"div"}
                sx={{
                  padding: "0.5em",
                  borderRadius: "0.5em",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
                }}
              >
                <List>
                  <ListItem disablePadding
                    // onMouseEnter={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    //   console.info("Masyarakat mouse enter \t:", event)
                    //   setOnHover(true)
                    // }}
                    // onMouseLeave={() => {
                    //   setOnHover(false)
                    // }}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={green[800]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      Masyarakat
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      226
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={orange[700]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      Bisnis
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      18
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={lightBlue[700]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      ASN/Pegawai
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      17
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={purple[700]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      Masyarakat
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      26
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item
              xs={12}
            >
              <Box
                component={"div"}
                sx={{
                  padding: "0.5em",
                  borderRadius: "0.5em",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
                }}
              >
                <List>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={green[400]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      Masyarakat
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      226
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={orange[700]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      Bisnis
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      226
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={lightBlue[700]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      ASN/Pegawai
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      226
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters disablePadding
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "default"
                    }}
                  >
                    <CircleBullet color={purple[700]} width={15} height={15} />
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                      flexGrow={1}
                    >
                      Masyarakat
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="subtitle2"
                    >
                      226
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
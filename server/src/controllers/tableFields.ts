const modeloOptions = ["codigo_modelo_fipe"];

const anoOptions = ["ano"];

const detalhesVeiculoOptions = [
  "marca",
  "modelo",
  "valor",
  "combustivel",
  "codigo_fipe",
  "mes_referencia",
  "sigla_combustivel",
];

const avaliacaoSegurancaOptions = [
  "imagem_veiculo",
  "avaliacao_geral",
  "avaliacao_capotagem",
  "chance_capotagem",
  "overall_front_crash_rating",
  "front_crash_driverside_rating",
  "front_crash_passengerside_rating",
  "overall_side_crash_rating",
  "side_crash_driverside_rating",
  "side_crash_passengerside_rating",
  "combined_side_barrier_and_pole_rating_front",
  "combined_side_barrier_and_pole_rating_rear",
  "side_barrier_rating_overall",
  "rollover_rating2",
  "rollover_possibility2",
  "dynamic_tip_result",
  "side_pole_crash_rating",
  "nhtsa_electronic_stability_control",
  "nhtsa_forward_collision_warning",
  "nhtsa_lane_departure_warning",
  "complaints_count",
  "recalls_count",
  "investigation_count",
  "model",
  "vehicle_description",
];

export type TablesType =
  | "modelo"
  | "ano"
  | "detalhes_veiculo"
  | "avaliacao_seguranca";

export const fieldToTable = {
  ...modeloOptions.reduce((obj, field) => ({ ...obj, [field]: "modelo" }), {}),
  ...anoOptions.reduce((obj, field) => ({ ...obj, [field]: "ano" }), {}),
  ...detalhesVeiculoOptions.reduce(
    (obj, field) => ({ ...obj, [field]: "detalhes_veiculo" }),
    {}
  ),
  ...avaliacaoSegurancaOptions.reduce(
    (obj, field) => ({ ...obj, [field]: "avaliacao_seguranca" }),
    {}
  ),
};

export const tableToForeignKey = {
  ano: "id",
  detalhes_veiculo: "id_ano",
  modelo: "id_modelo",
  marca: "id_marca",
  avaliacao_seguranca: "id_veiculo",
};

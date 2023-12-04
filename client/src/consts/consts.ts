const marcaOptions = ["marca.id", "codigo", "nome_marca"];

const modeloOptions = [
  "modelo.id",
  "codigo_modelo_fipe",
  "nome_modelo",
  "id_marca",
];

const anoOptions = ["ano.id", "codigo", "nome", "ano"];

const detalhesVeiculoOptions = [
  "detalhes_veiculo.id",
  "tipo_veiculo",
  "valor",
  "marca",
  "modelo",
  "ano_modelo",
  "combustivel",
  "codigo_fipe",
  "mes_referencia",
  "sigla_combustivel",
  "id_modelo",
  "id_ano",
];

const avaliacaoSegurancaOptions = [
  "avaliacao_seguranca.id",
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
  "model_year",
  "make",
  "model",
  "vehicle_description",
  "vehicle_id",
  "id_veiculo",
];

export const options: string[] = [
  ...marcaOptions,
  ...modeloOptions,
  ...anoOptions,
  ...detalhesVeiculoOptions,
  ...avaliacaoSegurancaOptions,
];

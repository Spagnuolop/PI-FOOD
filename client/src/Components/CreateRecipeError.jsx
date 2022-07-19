export default function validaciones(name, value, errors = {}) {
  switch (name) {
    case "title":
      if (!value) {
        errors.title = "Title is necessary";
      } else {
        errors.title = "";
      }
      break;
    case "summary":
      if (!value) {
        errors.summary = "Summary is necessary";
      } else {
        errors.summary = "";
      }
      break;
    case "healthScore":
      if (value > 100 || !value) {
        errors.healthScore = "HealthScore is necessary and less than 100";
      } else {
        errors.healthScore = "";
      }
      break;
    case "steps":
      if (!value) {
        errors.steps = "Steps is necessary ";
      } else {
        errors.steps = "";
      }
      break;
    case "image":
      if (!value) {
        errors.image = "Image is necessary ";
      } else {
        errors.image = "";
      }
      break;
    default:
  }
  return errors;
}

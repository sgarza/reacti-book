import React from "react";
import uuid from "uuid/v4";
import { pick, omit, includes } from "lodash";

const ALLOWED_CONFIG = [
  "type",
  "min",
  "max",
  "step",
  "placeholder",
  "rows",
  "cols",
  "children",
  "disabled",
  "maxLength",
  "insideHint",
  "tabindex",
  "onChange",
  "checked",
  "value",
  "options"
];

const ADDITIONAL_CONFIG = ["defaultValue"];

export default config => {
  const {
    input,
    noGroup,
    label,
    description,
    subtext,
    required,
    meta: { touched, error }
  } = config;
  const cssClass = touched && error ? "has-danger" : "";
  const className = buildClassName(config);
  const fieldProps = { className, ...input, ...pick(config, ALLOWED_CONFIG) };
  const additionalProps = { ...pick(config, ADDITIONAL_CONFIG) };

  if (!fieldProps.id) {
    fieldProps.id = `${fieldProps.name}-${uuid()}`;
  }

  if (fieldProps.type === "checkbox")
    return checkboxInput(label, subtext, fieldProps);

  if (noGroup) return simpleInput(cssClass, fieldProps);

  return (
    <div className={`form-group ${cssClass}`}>
      {renderLabel(label, required, fieldProps.id)}
      {renderDescription(description)}
      {fieldTag(fieldProps, additionalProps)}
      {renderSubtext(subtext, touched && error)}
    </div>
  );
};

const buildClassName = config => {
  const nonFormControl = ["dropdown", "address", "multi_select"];
  return [
    includes(nonFormControl, config.type) ? null : "form-control",
    config.className
  ].join(" ");
};

const simpleInput = (cssClass, props) => (
  <div className={cssClass}>{fieldTag(props)}</div>
);

const checkboxInput = (label, subtext, props) => (
  <div className="form-check">
    <label className="form-check-label pb-0">
      {fieldTag({ ...props, className: "form-check-input" })}{" "}
      <span>{label}</span>
    </label>
    {subtext && <p>{renderSubtext(subtext)}</p>}
  </div>
);

const renderDescription = description => {
  if (!description) return null;
  return (
    <div className="mb-2">
      <span className="small-print">{description}</span>
    </div>
  );
};

const renderSubtext = (subtext, error = false) => {
  if (!subtext && !error) return null;
  return (
    <span className="subtext">
      <sub className="small-print">{error || subtext}</sub>
    </span>
  );
};

const attachInsideHint = (field, insideHint) => {
  if (insideHint) {
    return (
      <div className="field-with-inside-hint">
        {field}
        <span className="hint">{insideHint}</span>
      </div>
    );
  }
  return field;
};

const fieldTag = (props, additionalProps = {}) => {
  const fieldProps = omit(props, ["insideHint", "options"]);

  if (props.type === "textarea") {
    return attachInsideHint(<textarea {...fieldProps} />, props.insideHint);
  }
  if (props.type === "select") {
    return attachInsideHint(
      <select {...fieldProps}>{props.children}</select>,
      props.insideHint
    );
  }
  return attachInsideHint(<input {...fieldProps} />, props.insideHint);
};

const markAsRequired = () => (
  <abbr title="required" className="required-mark">
    *
  </abbr>
);

const renderLabel = (text, required, id) => {
  if (!text) return null;
  return (
    <label htmlFor={id}>
      {text}
      {required && markAsRequired()}
    </label>
  );
};

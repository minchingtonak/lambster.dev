import React from "react";

export const InfoModal = () => (
  <div
    className="modal fade"
    id="infoModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="infoModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="infoModalLabel">
            <i className="fas fa-info-circle mr-3 d-none d-md-inline d-lg-inline"></i>What is lambda
            calculus?
          </h4>
          <button
            type="button"
            className="close my-auto py-0"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Lambda calculus is a model of computation created by{" "}
            <a href="https://en.wikipedia.org/wiki/Alonzo_Church">Alonzo Church</a> and is widely
            known as the smallest universal programming language. This means that any computable
            function can be computed with the lambda calculus. Lambda calculus consists solely of
            two elements: function abstraction and function application. It is the inspiration for
            functional programming languages as well as lambda expressions seen in many languages.
          </p>{" "}
          <br />
          <h5>How does it work?</h5>
          <hr />
          <p>
            Lambda calculus relies on function abstraction (λ expressions) and function application
            (β-reduction) to encode computation. The computation is executed by{" "}
            <strong>
              <em>reducing</em>
            </strong>{" "}
            a lambda calculus term to{" "}
            <strong>
              <em>normal form</em>
            </strong>
            , a form in which the term cannot be reduced anymore. There are two main types of
            reduction: α-reduction and β-reduction. An α-reduction is a renaming of a λ expression
            and is used to ensure a function and its argument have distinct names. A β-reduction is
            a substitution of one term into another and is how a function is applied to its
            argument. You can learn more about reductions{" "}
            <a href="https://en.wikipedia.org/wiki/Lambda_calculus#Reduction">here</a>.
          </p>
          <p>
            It may not seem like it, but this behavior is enough for us to be able to compute
            anything that's computable. We can start to build up abstractions that are a little more
            familiar:
          </p>
          <code>true = (λt. λf. t)</code>
          <br />
          <code>false = (λt. λf. f)</code>
          <br />
          <code>and = (λa. (λb. ((a b) a)))</code>
          <br />
          <br />
          <p>
            These cleverly designed λ expressions behave exactly like booleans when used with each
            other.
          </p>
          <code>and true false → false</code>
          <br />
          <br />
          <p>
            To see the intermediate steps of this reduction, simply type <code>and true false</code>{" "}
            into lambster and set the verbosity to either <strong>reductions</strong> or{" "}
            <strong>step-by-step</strong>
          </p>
          <p>
            Lambster has many more of these useful abstractions built in. Use the <code>env</code>{" "}
            command to see them all.
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

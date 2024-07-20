import { fabric } from "fabric";
import { v4 as uuid4 } from "uuid";
import {
  CanvasMouseDown,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasObjectModified,
  CanvasObjectScaling,
  CanvasPathCreated,
  CanvasSelectionCreated,
  RenderCanvas,
} from "@/types/type";
import { defaultNavElement } from "@/constants";
import { createSpecificShape } from "./shapes";

// Initialize fabric canvas
export const initializeFabric = ({
  fabricRef,
  canvasRef,
}: {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) => {
  // Get canvas element
  const canvasElement = document.getElementById("canvas");

  // Create fabric canvas
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  // Set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
  fabricRef.current = canvas;

  return canvas;
};

// Handle canvas mouse down event to create custom fabric object/shape and add it to canvas
export const handleCanvasMouseDown = ({
  options,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: CanvasMouseDown) => {
  // Get pointer coordinates
  const pointer = canvas.getPointer(options.e);

  // Get target object i.e., the object that is clicked
  const target = canvas.findTarget(options.e, false);

  // Set canvas drawing mode to false
  canvas.isDrawingMode = false;

  // If selected shape is freeform, set drawing mode to true and return
  if (selectedShapeRef.current === "freeform") {
    isDrawing.current = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    return;
  }

  canvas.isDrawingMode = false;

  // If target is the selected shape or active selection, set isDrawing to false
  if (
    target &&
    (target.type === selectedShapeRef.current ||
      target.type === "activeSelection")
  ) {
    isDrawing.current = false;

    // Set active object to target
    canvas.setActiveObject(target);
    target.setCoords();
  } else {
    isDrawing.current = true;

    // Create custom fabric object/shape and set it to shapeRef
    shapeRef.current = createSpecificShape(
      selectedShapeRef.current,
      pointer as any
    );

    // If shapeRef is not null, add it to canvas
    if (shapeRef.current) {
      canvas.add(shapeRef.current);
    }
  }
};

// Handle mouse move event on canvas to draw shapes with different dimensions
export const handleCanvasMouseMove = ({
  options,
  canvas,
  isDrawing,
  selectedShapeRef,
  shapeRef,
  syncShapeInStorage,
}: CanvasMouseMove) => {
  if (!isDrawing.current) return;
  if (selectedShapeRef.current === "freeform") return;

  canvas.isDrawingMode = false;

  // Get pointer coordinates
  const pointer = canvas.getPointer(options.e);

  // Set shape dimensions based on pointer coordinates
  switch (selectedShapeRef?.current) {
    case "rectangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "circle":
      shapeRef.current.set({
        radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
      });
      break;

    case "triangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "line":
      shapeRef.current?.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      break;

    case "image":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    default:
      break;
  }

  // Render objects on canvas
  canvas.renderAll();

  // Sync shape in storage
  if (shapeRef.current?.objectId) {
    syncShapeInStorage(shapeRef.current);
  }
};

// Handle mouse up event on canvas to stop drawing shapes
export const handleCanvasMouseUp = ({
  canvas,
  isDrawing,
  shapeRef,
  activeObjectRef,
  selectedShapeRef,
  syncShapeInStorage,
  setActiveElement,
}: CanvasMouseUp) => {
  isDrawing.current = false;
  if (selectedShapeRef.current === "freeform") return;

  // Sync shape in storage as drawing is stopped
  syncShapeInStorage(shapeRef.current);

  // Reset everything to null
  shapeRef.current = null;
  activeObjectRef.current = null;
  selectedShapeRef.current = null;

  // If canvas is not in drawing mode, set active element to default nav element after 700ms
  if (!canvas.isDrawingMode) {
    setTimeout(() => {
      setActiveElement(defaultNavElement);
    }, 700);
  }
};

// Update shape in storage when object is modified
export const handleCanvasObjectModified = ({
  options,
  syncShapeInStorage,
}: CanvasObjectModified) => {
  const target = options.target;
  if (!target) return;

  if (target?.type == "activeSelection") {
    // Handle active selection modification
  } else {
    syncShapeInStorage(target);
  }
};

// Update shape in storage when path is created in freeform mode
export const handlePathCreated = ({
  options,
  syncShapeInStorage,
}: CanvasPathCreated) => {
  const path = options.path;
  if (!path) return;

  // Set unique id to path object
  path.set({
    objectId: uuid4(),
  });

  // Sync shape in storage
  syncShapeInStorage(path);
};

// Restrict object to canvas boundaries during movement
export const handleCanvasObjectMoving = ({
  options,
}: {
  options: fabric.IEvent;
}) => {
  const target = options.target as fabric.Object;
  const canvas = target.canvas as fabric.Canvas;

  target.setCoords();

  // Restrict object to canvas boundaries (horizontal)
  if (target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0)
      )
    );
  }

  // Restrict object to canvas boundaries (vertical)
  if (target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0)
      )
    );
  }
};

// Set element attributes when element is selected
export const handleCanvasSelectionCreated = ({
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {
  if (isEditingRef.current) return;
  if (!options?.selected) return;

  const selectedElement = options?.selected[0] as fabric.Object;

  if (selectedElement && options.selected.length === 1) {
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke || "",
      fontSize: (selectedElement as any)?.fontSize || "",
      fontFamily: (selectedElement as any)?.fontFamily || "",
      fontWeight: (selectedElement as any)?.fontWeight || "",
    });
  }
};

// Update element attributes when element is scaled
export const handleCanvasObjectScaling = ({
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {
  const selectedElement = options.target;

  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};

// Render canvas objects coming from storage on canvas
export const renderCanvas = ({
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas) => {
  fabricRef.current?.clear();

  Array.from(canvasObjects, ([objectId, objectData]) => {
    fabric.util.enlivenObjects(
      [objectData],
      (enlivenedObjects: fabric.Object[]) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          if (activeObjectRef.current?.objectId === objectId) {
            fabricRef.current?.setActiveObject(enlivenedObj);
          }
          fabricRef.current?.add(enlivenedObj);
        });
      },
      "fabric"
    );
  });

  fabricRef.current?.renderAll();
};

// Resize canvas dimensions on window resize
export const handleResize = ({ canvas }: { canvas: fabric.Canvas | null }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement || !canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};

// Zoom canvas on mouse scroll
export const handleCanvasZoom = ({
  options,
  canvas,
}: {
  options: fabric.IEvent & { e: WheelEvent };
  canvas: fabric.Canvas;
}) => {
  const delta = options.e?.deltaY;
  let zoom = canvas.getZoom();

  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);

  options.e.preventDefault();
  options.e.stopPropagation();
};
